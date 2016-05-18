// sample prompt:
{
  type: 'input',
  name: 'username',
  message: 'What is your username?',
},
{
  type: 'input',
  name: 'password',
  message: 'What is your password?',
}



function makeQuestion(type, name, message) {
  return {type, name, message}
}
