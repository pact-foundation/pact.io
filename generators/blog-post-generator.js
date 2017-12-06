const fs = require('fs');
const {inputRequired} = require('./utils');

const authors = JSON.parse(fs.readFileSync('./data/author.json'));

module.exports = plop => {
	plop.setGenerator('blog post', {
		prompts: [
			{
				type: 'input',
				name: 'title',
				message: 'Blog post title?',
				validate: inputRequired('title')
			},
			{
				type: 'list',
				name: 'author',
				message: 'The author of blog post?',
				choices: authors.map(author => ({name: author.id, value: author.name}))
			},
			{
				type: 'input',
				name: 'tags',
				message: 'tags? (separate with coma)'
			},
			{
				type: 'confirm',
				name: 'draft',
				message: 'It\'s a draft?'
			}
		],
		actions: data => {
			// Get current date
			data.createdDate = new Date().toISOString().split('T')[0];
			data.year = new Date().getFullYear();
			data.month = new Date().getMonth();
			data.date = new Date().getDate();

			// Parse tags as yaml array
			if (data.tags) {
				data.tags = `\n  - ${data.tags.split(',').join('\n  - ')}`;
			}

			return [
				{
					type: 'add',
					path: '../data/blog/{{year}}/{{month}}/{{date}}/{{dashCase title}}.md',
					templateFile: 'templates/blog-post-md.template'
				}
			];
		}
	});
};
