const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(c => c.id === contactId);
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts(); 
    const filteredContacts = contacts.filter(c => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return contacts.length !== filteredContacts.length;
  }
  
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
  
    const newContact = {
      id: crypto.randomUUID(), 
      name,
      email,
      phone,
    };
  
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }