const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact || 'Contact not found');
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log('Added contact:', newContact);
      break;

    case 'remove':
      const success = await contacts.removeContact(id);
      console.log(success ? 'Contact removed' : 'Contact not found');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
