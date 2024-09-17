import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

export const initialUsersList: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `user${index + 11}`,
    name: `User${index + 11}`,
    description: `Description for User ${index + 11}`,
  })
);

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

const InitialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: InitialUsersState,
  selectors: {
    selectSelectedUserId: (state) => state.selectedUserId,
    selectSorted: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: "asc" | "desc") => sort,
      (ids, entities, sort) =>
        ids
          .map((id) => entities[id])
          .sort((a, b) => {
            if (sort === "asc") {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          })
    ),
  },
  reducers: {
    selected: (state, action: PayloadAction<{ userId: UserId }>) => {
      //   const { userId } = action.payload;
      //   return {
      //     ...state,
      //     selectedUserId: userId,
      //   };
      state.selectedUserId = action.payload.userId;
    },
    selectRemoved: (state) => {
      //   return {
      //     ...state,
      //     selectedUserId: undefined,
      //   };

      state.selectedUserId = undefined;
    },
    stored: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id),
      };
    },
  },
});
