# setup

> $ npm i

> $ npm start

# functions

if you set `./src/config.json` like following params

```
{
  "site": {
    "base_url": "https://rarejob.com",
    "urls": [
      "https://www.rarejob.com/config/",
      "https://www.rarejob.com/",
      "https://www.rarejob.com/reservation/#searchWordTarget=1",
      "https://www.rarejob.com/config/email/",
      "https://www.rarejob.com/teacher_detail/1409/"
    ]
  },
  "login": {
    "url": "https://www.rarejob.com/account/login/",
    "success_after_login_url": "https://www.rarejob.com/mypage/",
    "target_form":{
      "email_filed_selector": "#RJ_LoginForm_email",
      "password_field_selector": "#RJ_LoginForm_password",
      "login_button_selector": "#rj--login-form > div:nth-child(2) > input[type=submit]"
    },
    "account": {
      "email": "",
      "password": ""
    }
  }
}

```

you will get following results

```
dist
├── config
│   ├── email
│   │   └── image.png
│   └── image.png
├── image.png
├── reservation
│   └── #searchWordTarget=1
│       └── image.png
└── teacher_detail
    └── 1409
        └── image.png
```
