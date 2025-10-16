import React from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { EMPTY_USER } from '../../constants/defaultUser';

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
  generatedId: number;
  users: User[];
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  generatedId,
  users,
}) => {
  const [title, setTitle] = React.useState('');
  const [titleErrorMessage, setTitleErrorMessage] = React.useState('');

  const [userId, setUserId] = React.useState<number>(0);
  const [userErrorMessage, setUserErrorMessage] = React.useState('');

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleErrorMessage('');
    setUserErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!userId) {
      setUserErrorMessage('Please choose a user');
    }

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: generatedId,
      title,
      userId: userId || 0,
      completed: false,
      user: users.find(user => user.id === userId) || EMPTY_USER,
    });

    reset();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    setTitleErrorMessage('');
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));

    setUserErrorMessage('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">
          Title:&nbsp;
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>

        {titleErrorMessage && (
          <span className="error">{titleErrorMessage}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(userOption => (
              <option key={userOption.id} value={userOption.id}>
                {userOption.name}
              </option>
            ))}
          </select>
        </label>

        {userErrorMessage && <span className="error">{userErrorMessage}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
