import requests

BASE_URL = "http://127.0.0.1:8000/"

def get_line_by_username(username):
    r = requests.get(BASE_URL + f"api/tgreq/stands_by_user/{username}")
    if r.text == "no user":
        return 'У вас нет событий, на которое вы зарегистрировались'
    result = ""
    for i, stand in enumerate(r.json()):
        result += "Номер события: " + str(stand["id"]) + ". Название события: " + stand["title"] + ". Описание события: " + stand["description"] + ". Время ожидания: " + stand["max_duration"] + "\n"
    return result


def get_line_by_id(event_id):
    r = requests.get(BASE_URL + f"api/tgreq/get_stand_by_id/{event_id}").json()
    return "Номер события: " + str(r["id"]) + ". Название события: " + r["title"] + ". Описание события: " + r["description"] +  ". Время ожидания: " + r["max_duration"]


def add_user_in_line(username, event_id):
    try:
        r = requests.post(BASE_URL + f"api/tgreq/add_user_to_stand/{username}/{event_id}")
        return {"status": "success"}
    except:
        return {"status": "error"}


def get_users_by_event_id(event_id):
    r = requests.get(BASE_URL + f"api/tgreq/users_by_stand/{event_id}").json()
    return "Очередь на это событие:\n" + "\n".join([str(i)+ ". Логин: " + user["telegram_login"] for i, user in enumerate(r)])


def delete_user_from_line_by_event_id(username, event_id):
    try:
        r = requests.delete(BASE_URL + f"api/tgreq/delete_user_from_stand/{event_id}/{username}")
        return {"status": "success"}
    except:
        return {"status": "error"}