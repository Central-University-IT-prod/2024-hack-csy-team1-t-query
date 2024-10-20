from aiogram.types import KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove, InlineKeyboardButton, \
    InlineKeyboardMarkup


def reg_to_line_kb():
    button1 = KeyboardButton(text="Да")
    button2 = KeyboardButton(text="Нет")
    buttons = [button1, button2]

    kb = ReplyKeyboardMarkup(keyboard=[buttons], resize_keyboard=True)
    return kb