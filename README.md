# teste-maps
Esse é um projeto testando diferentes bibliotecas para integração com maps. Porém vamos focar na @react-google-maps/api
 
### Primeiros passos
1. Crie um projeto no [Developers Google](https://developers.google.com/maps/documentation/javascript/cloud-setup?hl=pt-br)

> Certifique-se de ter uma conta de faturamento antes de criar o projeto

2. Adicione uma apiKey em [Credenciais](https://console.cloud.google.com/apis/credentials)
3. Este teste (da pasta /ReactGoogleMapsAPI) depende diretamente da biblioteca `@react-google-maps/api` que já está no package.json
4. O teste da pasta /GoogleMapsReactWrapper não está sendo utilizado no momento, mas depende das bibliotecas `npm install @googlemaps/react-wrapper` e `npm i -D @types/google.maps`

5. Ao baixar o projeto, o arquivo main.tsx controla qual exemplo será exibido. 
![image](https://github.com/jemluz/teste-maps/assets/23065460/5ee662e7-558f-4e63-b3ea-8d847b656ba2)

6. Dirija-se a pasta do exemplo/teste desejado para começar a experimentar.
