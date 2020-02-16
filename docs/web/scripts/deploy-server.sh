#!/bin/bash

currentDir="${PWD##*/}"

echo "$currentDir"

if [ "$currentDir" == "scripts" ]; then
   cd ../.docz/dist;

   echo "Copiando arquivos, aguarde...";

   fileFolder="mkdir -p ~/projects/docz"
   ssh synsuite@s11.syntesis.com.br "$fileFolder"
   scp -r * synsuite@s11.syntesis.com.br:projects/docz

   echo "Arquivos copiados com sucesso.";
else
   echo "Atenção... Rode o atualizador na pasta \"docs\"."
fi
