#include <LiquidCrystal.h> //Necessaria para o Display
#include <Keypad.h> //Necessario para o teclado
#include <WiFi.h> //Necessario para Wifi
#include <HTTPClient.h> // Necessario para comunicao com o servidor

/* Configuração Wifi */
const char* ssid = "lucas";
const char* password =  "12345678";
/* Fim Configuração Wifi */

/* Configuração do Display */
LiquidCrystal lcd(23,22,21,19,18,5);
/* Fim configuração do Display */

/* Configuração do Teclado */
const byte qtdLinhas = 4; //QUANTIDADE DE LINHAS DO TECLADO
const byte qtdColunas = 4; //QUANTIDADE DE COLUNAS DO TECLADO
int digitosColaborador = 0;

//CONSTRUÇÃO DA MATRIZ DE CARACTERES
char matriz_teclas[qtdLinhas][qtdColunas] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};


byte PinosqtdLinhas[qtdLinhas] = {13, 12, 14, 27}; //PINOS UTILIZADOS PELAS LINHAS
byte PinosqtdColunas[qtdColunas] = {26,25,33,32}; //PINOS UTILIZADOS PELAS COLUNAS

//\INICIALIZAÇÃO DO TECLADO
Keypad meuteclado = Keypad( makeKeymap(matriz_teclas), PinosqtdLinhas, PinosqtdColunas, qtdLinhas, qtdColunas); 
/* Fim Configuração do Teclado */

void setup()
{
    Serial.begin(9600); //INICIALIZA A SERIAL
    
    //setiup do Wifi
    WiFi.begin(ssid, password);
 
      while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi..");
      }
 
    Serial.println("Connected to the WiFi network");
    
    //setup do LCD
    lcd.begin(16, 2);
    lcd.clear();
  
}
void loop(){

  /*
    lcd.print("Ola mundo");

    // go to row 1 column 0, note that this is indexed at 0
    lcd.setCursor(0,1); 
    lcd.print ("LCD with ESP32");
*/
    mostrarMensagemDisplay("Ola mundo");
    
    char tecla_pressionada = meuteclado.getKey(); //VERIFICA SE ALGUMA DAS TECLAS FOI PRESSIONADA

//  Serial.print("Digite numero do colaborador : "); //IMPRIME O TEXTO NO MONITOR SERIAL 

  if(digitosColaborador < 4){
    
     if (tecla_pressionada){ //SE ALGUMA TECLA FOR PRESSIONADA, FAZ
      Serial.println(tecla_pressionada); //IMPRIME NO MONITOR SERIAL A TECLA PRESSIONADA
      delay(200);
      digitosColaborador++;
    }
  }else{
     Serial.println("Verificando os dados"); //IMPRIME NO MONITOR SERIAL A TECLA PRESSIONADA
     digitosColaborador = 0;
  }
 
 }

 void mostrarMensagemDisplay(const char * mensagem){
      lcd.print(mensagem);

    // go to row 1 column 0, note that this is indexed at 0
    lcd.setCursor(0,1); 
    //lcd.print ("LCD with ESP32");

    
 }


void getDadosServidor(){
if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
 
    HTTPClient http;
 
    http.begin("http://jsonplaceholder.typicode.com/comments?id=10"); //Specify the URL
    int httpCode = http.GET();                                        //Make the request
 
    if (httpCode > 0) { //Check for the returning code
 
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);
      }
 
    else {
      Serial.println("Error on HTTP request");
    }
 
    http.end(); //Free the resources
  }
 
  delay(10000);
}
