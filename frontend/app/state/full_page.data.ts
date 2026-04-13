
export interface Todo { 
	id:number,
	title:string,
	completed:boolean
}
export interface TodoState {
	todos: Todo[];
	error: string | null;
	fetchTodos: () => Promise<void>;
	addTodo: (title: string) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
	toggleTodo: (id: number) => Promise<void>;
	clearError: () => void;
}