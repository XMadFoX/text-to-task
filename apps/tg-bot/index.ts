import { Bot } from 'grammy';
import { generateTask } from '@ttt/generate';
import { createTask } from '@ttt/core';

// Create a bot object
const bot = new Bot(process.env.TG_BOT_TOKEN!);

const allowedUsers = process.env
	.TG_BOT_ALLOWED_USERS!.split(',')
	.map((x) => parseInt(x));

const createIssueConfirmations = new Map();

// Register listeners to handle messages
bot.on('message', async (ctx) => {
	// console.log(ctx);
	if (!ctx?.message.text?.includes('@task')) return;
	if (!allowedUsers.includes(ctx.from.id)) {
		ctx.reply('Not allowed', {
			reply_parameters: {
				message_id: ctx.message.message_id,
			},
		});

		return;
	}
	const msg = ctx.message.text.replace('@task', '').trim();

	const replyMsg = await ctx?.reply('Generating...', {
		reply_parameters: { message_id: ctx.message.message_id },
	});
	const timeA = Date.now();
	const res = await generateTask(msg);
	await createTask(res);
	const timeB = Date.now();
	console.log(res);
	bot.api.editMessageText(
		ctx.chatId,
		replyMsg.message_id,
		// escape { and } via regex and replace
		`\`\`\`json\n
${JSON.stringify(res, null, 2).replace(/([{}])/g, '\\$1')}\n\`\`\`
\n\n
Took: ${timeB - timeA}ms`,
		{ parse_mode: 'MarkdownV2' }
	);
	// add like reaction
	bot.api.setMessageReaction(ctx.chatId, replyMsg.message_id, [
		{ type: 'emoji', emoji: '👍' },
	]);
	createIssueConfirmations.set(ctx.chatId + ':' + replyMsg.message_id, res);
	// ctx?.reply(res, { reply_parameters: { message_id: ctx.message.message_id } });
});

bot.reaction('👍', async (ctx) => {
	console.log('reaction', ctx);
	console.log(
		createIssueConfirmations.get(ctx.chatId + ':' + ctx?.message?.message_id)
	);
});

bot.on('message_reaction', async (ctx) => {
	const reaction = ctx.messageReaction;
	console.log(reaction);
	// We only receive the message identifier, not the message content.
	const message = reaction.message_id;
	// The difference between these two lists describes the change.
	const old = reaction.old_reaction; // previous
	const now = reaction.new_reaction; // current
});

// Start the bot (using long polling)
bot.start({
	allowed_updates: [
		'message',
		'edited_message',
		'message_reaction',
		'message_reaction_count',
	],
});
