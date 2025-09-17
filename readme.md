# To-Do List (Expo / React Native)

## What I built & how

- **A new Expo project** named `Todo-List` using `npx create-expo-app`.
- Kept the standard Expo structure and scripts (start / android / ios / web) from the scaffold.
- Implemented the app in **`App.js`** using:

  - `useState` to manage input text, task list, and inline editing state.
  - `FlatList` to render tasks dynamically as the list changes.
  - `Pressable` buttons for **Add**, **Edit**, **Save**, and **Delete**.
  - `@expo/vector-icons/Feather` for larger edit/delete icons with extra spacing.

- **Styling changes** I made (compared to the baseline):

  - Larger **title** and **input** text.
  - **Bordered “Add” button** (styled `Pressable`).
  - **Bigger** edit/delete icons with **more space** between them.
  - **Soft green** color palette throughout (background, borders, accents).

## How to use the app

- **Add a task**

  - Type in the input field and tap **Add** (or press **Return/Enter**).

- **Edit a task**

  - Tap the **pencil** icon to switch the row into edit mode.
  - Change the text; press **Save** (floppy icon) or press **Return**.

- **Delete a task**

  - Tap the **trash** icon on the row you want to remove.

## Implementation notes (for grading)

- **State management**: `useState` stores the current input value, the `list` of tasks (array of `{ id, name }`), and edit state (`editingId`, `editingText`).
- **Dynamic rendering**: `FlatList` re-renders when `list` changes, so items appear immediately on **Add**, update on **Save**, and disappear on **Delete**.
- **Accessibility / touch targets**: icons use larger sizes and added spacing to make tapping easier.
- **Styling**: soft-green theme (light sage background, sage borders, darker green accents); larger title and input font sizes; “Add” is a bordered button for clear affordance.

---

**Repository link:** https://github.com/charleycorneil/Todo-List
