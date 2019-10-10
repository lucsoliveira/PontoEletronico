#!/usr/bin/python
# Example using a character LCD connected to a Raspberry Pi
import time
import Adafruit_CharLCD as LCD
import requests
import json

# Raspberry Pi pin setup
lcd_rs = 25
lcd_en = 24
lcd_d4 = 23
lcd_d5 = 17
lcd_d6 = 18
lcd_d7 = 22
lcd_backlight = 2

# Define LCD column and row size for 16x2 LCD.
lcd_columns = 16
lcd_rows = 2

lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7, lcd_columns, lcd_rows, lcd_backlight)

lcd.message('Empresa X | Ponto Eletronico - V. Alpha')
# Wait 5 seconds

time.sleep(1.0)
lcd.clear()

#Pede os dados de CPF e Senha

r = requests.get('https://github.com/timeline.json').json();
print(r.get('message'))

cpfText = input("Digite seu CPF: ")
lcd.message(cpfText)
lcd.clear()

senhaText = input("Digite sua senha: ")
lcd.message(senhaText)
lcd.clear()

#Envia o POST para o servidor e obtem o resultado
dadosColaborador = {'colaboradorCpf': cpfText, 'colaboradorSenha': senhaText}
postVerificaDados = requests.post("http:/localhost:3000/api/post/registro", data=dadosColaborador).json()
print(postVerificaDados)

# Wait 5 seconds
time.sleep(5.0)
lcd.clear()
lcd.message('Goodbye\nWorld!')

time.sleep(5.0)
lcd.clear()