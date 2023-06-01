const contactsActions = require("./db/contacts")

const { Command } = require("commander")
const program = new Command()
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const list = await contactsActions.listContacts()
			return console.log(list)

		case "get":
			const contact = await contactsActions.getContactById(id)
			return console.log(contact)

		case "add":
			const newContact = await contactsActions.addContact({
				name,
				email,
				phone,
			})
			return console.log(newContact)

		case "update":
			const updateContact = await contactsActions.updateContactById(id, {
				name,
				email,
				phone,
			})
			return console.log(updateContact)

		case "remove":
			const deleteContact = await contactsActions.removeContact(id)
			return console.log(deleteContact)

		default:
			console.warn("Unknown action type!")
	}
}

invokeAction(argv)
