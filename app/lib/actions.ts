import postgres from 'postgres';
import { Tag, Todo } from '../todos/helper';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function listTest() {
  const data = await sql`
    SELECT * from test
  `;

  return data;
};

export async function createTodo(todo: Todo) {
  const data = await sql`
    INSERT INTO todos (title, description, completed, priority, tags) 
    VALUES (${todo.text}, ${todo.description || null}, ${todo.status === 'done'}, ${todo.priority || 'medium'}, ${todo.tags || []})
  `;

  return data;
};

export async function createTag(tag: Tag) {
  const data = await sql`
    INSERT INTO tags (name, color) VALUES (${tag.name}, ${tag.color})
  `;

  return data;
};
