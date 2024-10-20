from aiogram import Bot, Dispatcher, types
import asyncio
from aiogram.enums import ParseMode
import os
from dotenv import load_dotenv
from aiogram.filters.command import Command
from aiogram.types.input_file import FSInputFile
from aiogram.fsm.state import State, StatesGroup
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
import bot.bot_replicas as replicas
from bot.manager import (get_line_by_id, get_line_by_username, 
                     add_user_in_line, get_users_by_event_id, 
                     delete_user_from_line_by_event_id)
from bot.keyboards import reg_to_line_kb
from aiogram.types import ReplyKeyboardRemove
import datetime
import time

load_dotenv()

bot = Bot(os.getenv("BOT_TOKEN"))
dp = Dispatcher()


class EventRate(StatesGroup):
    event_id_rate_reg = State()
    event_id_rate_all = State()
    event_choose = State()
    is_valid = False
    event_id = None


@dp.message(Command("help"))
async def get_help_command(mes: types.Message):
    await mes.answer(replicas.help_answer)


@dp.message(StateFilter(None), Command("reg_line"))
async def get_event_command(mes: types.Message, state: FSMContext):
    await mes.answer(replicas.event_answer)
    await state.set_state(EventRate.event_id_rate_reg)


@dp.message(EventRate.event_id_rate_reg)
async def get_event_rate(mes: types.Message, state: FSMContext):
    if not EventRate.is_valid:
        try:
            event = get_line_by_id(int(mes.text))
            if not event is None:
                EventRate.event_id = int(mes.text)
                EventRate.is_valid = True
                await mes.answer("Инфа по событию:\n" + event + "\nХотите встать в очередь?", reply_markup=reg_to_line_kb())
            else:
                await mes.answer(replicas.event_not_exists_answer)
        except:
            await mes.answer(replicas.change_type)

    elif EventRate.is_valid:
        if mes.text.lower() == "да":
            add_user_in_line(mes.from_user.username, EventRate.event_id)
            line = get_line_by_id(EventRate.event_id)
            res = time.strptime(line.split()[-1], "%H:%M:%S")
            delay = datetime.timedelta(hours=res.tm_hour, minutes=res.tm_min, seconds=res.tm_sec).seconds
            asyncio.create_task(send_message_by_timer(mes.chat.id, "Ваша очередь пришла! Вы большой молодец", delay))

            await mes.answer("Вы зарегистрированы! Hello new zealand!", reply_markup=ReplyKeyboardRemove())
            await state.clear()
            EventRate.event_id = None
            EventRate.is_valid = False
        elif mes.text.lower() == "нет":
            await mes.answer(replicas.refusal_add_user_in_line, reply_markup=ReplyKeyboardRemove())
            await state.clear()
            EventRate.event_id = None
            EventRate.is_valid = False
        else:
            await mes.answer(replicas.wrong_add_user_in_line)


@dp.message(Command("my_lines"))
async def get_help_command(mes: types.Message):
    lines_by_username = get_line_by_username(mes.from_user.username)
    if lines_by_username:
        await mes.answer(lines_by_username)
    else:
        await mes.answer(replicas.not_events)


@dp.message(StateFilter(None), Command("redact_line"))
async def get_redact_line_command(mes: types.Message, state: FSMContext):
    events = get_line_by_username(mes.from_user.username)
    if events:
        await mes.answer(replicas.event_answer)
        await mes.answer(events)
    else:
        await mes.answer(replicas.not_events)
    await state.set_state(EventRate.event_choose)


@dp.message(EventRate.event_choose)
async def get_event_rate_all_users(mes: types.Message, state: FSMContext):
    delete_user_from_line_by_event_id(username=mes.from_user.username, event_id=int(mes.text))
    await mes.answer(replicas.success_delete_from_line_answer)
    await state.clear()


@dp.message(StateFilter(None), Command("all_users_on_event"))
async def get_all_users_on_event_command(mes: types.Message, state: FSMContext):
    await mes.answer(replicas.event_answer)
    await state.set_state(EventRate.event_id_rate_all)


@dp.message(EventRate.event_id_rate_all)
async def get_event_rate_all_users(mes: types.Message, state: FSMContext):
    users_on_event = get_users_by_event_id(int(mes.text))
    if users_on_event:
        await mes.answer(users_on_event)
    else:
        await mes.answer(replicas.event_not_exists_answer)
    await state.clear()


async def send_message_by_timer(chat_id: int, message: str, delay: int):
    await asyncio.sleep(delay)
    await bot.send_message(chat_id=chat_id, text=message)
    

async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())