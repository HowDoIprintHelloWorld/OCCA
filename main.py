from flask import Flask, render_template, url_for, request, make_response
from datetime import datetime

app = Flask(__name__)
@app.route("/")
def home():
  resp = setCookie(make_response(render_template("index.html", messages=getMessages())))
  return resp

def getMessages():
  with open("chat.txt", "r") as file:
    return file.readlines()


@app.route("/api/getmessages")
def getHistory():
  history = getMessages()
  return history


def setCookie(resp, user=None):
  if not user:
    user = "Anonymous"
  resp.set_cookie('username', user)
  return resp

@app.route("/api/send", methods=['POST'])
def sendMessage():
  msg = request.data.decode("utf-8")

  if not msg:
    return "Please send a message"

  if msg[0] == "!":
    if "!set-user" in msg and len(msg.split()) >= 2:
      print("Setting user...")
      return setCookie(make_response(), user=msg.split()[1])

    else:
      return "No or invalid command specified"

  username = request.cookies.get('username')
  if not username:
    return "No username!"
      
  
  with open("chat.txt", "a") as file:
    now = str(datetime.now().strftime("%H:%M"))
    file.write(f"[{now}] {username}:   "+msg+"\n")
  return "Request received"


app.run("0.0.0.0")
