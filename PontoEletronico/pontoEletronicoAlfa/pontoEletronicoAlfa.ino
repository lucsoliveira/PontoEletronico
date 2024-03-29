#include <LiquidCrystal.h> //Necessaria para o Display
#include <Keypad.h> //Necessario para o teclado
#include <WiFi.h> //Necessario para Wifi
#include <HTTPClient.h> // Necessario para comunicao com o servidor
#include "LibJson.h" // Necessario para serialização dos dados recebidos do servidor
#include <SimpleTimer.h>  // Necessario para facilitar o temporizador

/* Configuração das URLs para Comunicação com o Servidor */
String senhaDigitada = "";
String urlBase = "http://10.1.2.55:3000/api/post/registro?senha=";
String urlSincronizarRelogio = "http://10.1.2.55:3000/api/get/sincronizar/relogio";

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

//Criação do objeto timer
SimpleTimer timer;


//Funcao de mostrar o relogio na tela
void mostrarMensagemDigitarSenha(){
  lcd.clear();
  lcd.print(sincronizacaoRelogio());
  lcd.setCursor(0,1); 
  lcd.print("Senha: ");
}

void setup()
{
  
    Serial.begin(9600); //INICIALIZA A SERIAL

    
    //setiup do Wifi
    WiFi.begin(ssid, password);
 
      while (WiFi.status() != WL_CONNECTED) {
        mostrarMensagemDisplay("Conectando na Rede...", 0);
       
        timer.setInterval(60000, mostrarMensagemDigitarSenha);
        
         delay(1000);
        Serial.println("Connecting to WiFi..");

        
      }
 
    Serial.println("Connected to the WiFi network");
    
    //setup do LCD
    lcd.begin(16, 2);
    lcd.clear();
  
}
void loop(){
   
    mostrarMensagemDisplay("Ponto Eletronico - Alfa", 2500);
    mostrarMensagemDigitarSenha();

    

    while(1){

      timer.run();
          //Inicio para pegar os dados digitados na tela
          char tecla_pressionada = meuteclado.getKey(); //VERIFICA SE ALGUMA DAS TECLAS FOI PRESSIONADA
      
      //  Serial.print("Digite numero do colaborador : "); //IMPRIME O TEXTO NO MONITOR SERIAL 
      
        if(digitosColaborador < 5){
          
           if (tecla_pressionada){ //SE ALGUMA TECLA FOR PRESSIONADA, FAZ
            Serial.println(tecla_pressionada);
            lcd.write(tecla_pressionada);
            delay(200);

            //acrescenta para a string
            senhaDigitada += tecla_pressionada;
            digitosColaborador++;
          }
        }else{
          
           mostrarMensagemDisplay("Aguarde...", 2500);
           digitosColaborador = 0;
           
           registrarPontoServidor(senhaDigitada);//chama o servidor
           senhaDigitada = ""; //zera a string de senha digitada

           mostrarMensagemDigitarSenha();
              
        }
    }
 
 }

 void mostrarMensagemDisplay(String mensagem, int time){

      lcd.clear();
    //quebra a mensagem se for nece\ssá\rio
      if(mensagem.length() > 16){

        for(int i  = 0; i <16; i++){
          lcd.write(mensagem.charAt(i));
        }

        lcd.setCursor(0,1); 
        
        for(int i  = 16; i < mensagem.length(); i++){
          lcd.write(mensagem.charAt(i));
        }

       
      }else{
        lcd.print(mensagem);
      }

      if(time != 0){
        delay(time);
      }
      
      lcd.clear();

    
 }

//Funcao de Sincronização do Relogio
//Funcao de Comunicacao com o servidor p/ Registro de Ponto
String sincronizacaoRelogio(){
if ((WiFi.status() == WL_CONNECTED)) { 
  //Checka o status da wifi
 
    HTTPClient http;
    http.begin(urlSincronizarRelogio); //Url do servidor 

    int httpCode = http.GET();                                        //Faz o Post do Registro
 
    if (httpCode > 0) { //Checa o retorno do servidor
 
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);

        //Manipulando a Resposta Json
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, payload);
        
        String relogio = doc["data"];

        return relogio;
        
      }else {
              return "Erro Sincronizacao";
    }
 
    http.end(); 
  }
 
  delay(5000);
}

//Funcao de Comunicacao com o servidor p/ Registro de Ponto
void registrarPontoServidor(String senhaColaborador){
if ((WiFi.status() == WL_CONNECTED)) { 
  //Checka o status da wifi
 
    HTTPClient http;
    http.begin(urlBase + senhaColaborador); //Url do servidor 
    http.addHeader("Content-Type", "text/plain");             //Altera o header
 
    int httpCode = http.POST("");                                        //Faz o Post do Registro
 
    if (httpCode > 0) { //Checa o retorno do servidor
 
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);

        //Manipulando a Resposta Json
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, payload);
        
        String msg = doc["msg"];
        String type = doc["type"];
        String colaboradorNome    = doc["data"]["nomeCompleto"];
        

        if(type == "error"){
            mostrarMensagemDisplay(msg, 3000);
            return;

        }else{
          mostrarMensagemDisplay("Ola, " + colaboradorNome + "!" , 2500);
            mostrarMensagemDisplay(msg, 3000);
            return;

        }

        
      }
 
    else {
              mostrarMensagemDisplay("Erro de comunicacao." , 2500);
              return;
            
    }
 
    http.end(); 
  }
 
  delay(5000);
}
