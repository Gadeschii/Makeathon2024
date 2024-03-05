He seguido este tutorial: https://jasonwatmore.com/post/2019/12/02/angular-nodejs-on-aws-how-to-deploy-a-mean-stack-app-to-amazon-ec2
Pasos a seguir si lo que quiero es subirla a AWS:
cada vez que exista un cambio en Fontend,
Antes de todo crear o reutilizar una instancia en AWS yo he utilizado: i-00a0aaace4a969561 (ServerUbuntu) t2.medium

- tengo qeu buildear: npm run build (crea el fichero dist)
- y tengo que subirlo con el comando: pscp -i C:\Users\javie\Downloads\simoKeyPrivate.ppk -r C:\Users\javie\Desktop\Deploy\Makeathon2024\FrontEndMakeathonCheckIn2024\dist\* ubuntu@ec2-18-133-138-203.eu-west-2.compute.amazonaws.com:/opt/FrontEnd
evidentemente necesito tener las claves y todo para que funcione lo guardare en DB24 

Con respecto a mongo, cuando se actualice para el proximo año, unicamente hay que utilizar la de credenciales y participante el resto no las uso.