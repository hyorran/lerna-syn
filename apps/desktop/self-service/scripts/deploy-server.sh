#!/bin/bash

currentDir="${PWD##*/}"

if [ -z "$1" ]; then
   echo "Atenção, informe a pasta de destino."
   exit 1;
fi

## Verifica se esta na pasta "self-service"
if [ "$currentDir" == "self-service" ]; then
   cd releases;

   echo "Copiando arquivos, aguarde...";


   fileFolder="mkdir -p ~/projects/totem/webroot/$1"
   ssh synsuite@totem.synsuite.com.br "$fileFolder"
   scp * synsuite@totem.synsuite.com.br:projects/totem/webroot/$1

   echo "Arquivos copiados com sucesso.";
else
   echo "Atenção... Rode o atualizador na pasta \"self-service\"."
fi
