import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Expo bundles this

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingText(name);
  };

  const saveEdit = (id) => {
    setList((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, name: editingText.trim() || g.name } : g
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const addItem = () => {
    const v = item.trim();
    if (!v) return;
    setList((prev) => [{ id: Date.now().toString(), name: v }, ...prev]);
    setItem("");
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((g) => g.id !== id));
  };

  const renderRow = ({ item: row }) => {
    const isEditing = editingId === row.id;
    return (
      <View style={styles.itemRow}>
        {isEditing ? (
          <TextInput
            style={[styles.itemText, styles.itemInput]}
            value={editingText}
            onChangeText={setEditingText}
            onSubmitEditing={() => saveEdit(row.id)}
            autoFocus
          />
        ) : (
          <Text style={styles.itemText}>{row.name}</Text>
        )}

        <View style={styles.iconRow}>
          {isEditing ? (
            <Pressable
              onPress={() => saveEdit(row.id)}
              hitSlop={8}
              style={styles.iconButton}
            >
              <Feather name="save" size={28} style={styles.iconSave} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => startEditing(row.id, row.name)}
              hitSlop={8}
              style={styles.iconButton}
            >
              <Feather name="edit" size={28} style={styles.iconEdit} />
            </Pressable>
          )}
          <Pressable
            onPress={() => removeItem(row.id)}
            hitSlop={8}
            style={styles.iconButton}
          >
            <Feather name="trash-2" size={28} style={styles.iconDelete} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#6B8F71"
          value={item}
          onChangeText={setItem}
          returnKeyType="done"
          onSubmitEditing={addItem}
        />
        <Pressable
          onPress={addItem}
          style={({ pressed }) => [
            styles.addBtn,
            pressed && styles.addBtnPressed,
          ]}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={list}
        keyExtractor={(g) => g.id}
        renderItem={renderRow}
        ListEmptyComponent={
          <Text style={styles.empty}>Nothing yet — add your first task!</Text>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const COLORS = {
  bg: "#DAD7CD", // very light sage
  card: "#E7EFE6", // item background
  border: "#A3B18A", // sage
  accent: "#5C7650", // medium green
  accentDark: "#3A5A40",
  text: "#2E3B2E",
  placeholder: "#6B8F71",
  danger: "#8A3B3B",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 36, // larger title
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.accentDark,
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: "#F4F7F2",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 18, // larger input text
    color: COLORS.text,
  },
  addBtn: {
    borderWidth: 2, // bordered Add button
    borderColor: COLORS.accent,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addBtnPressed: { backgroundColor: "#EDF3EC" },
  addBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accentDark,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    // iOS shadow:
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Android shadow (correct key name):
    elevation: 2,
  },
  itemText: {
    flexShrink: 1,
    fontSize: 18,
    color: COLORS.text,
  },
  itemInput: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F6FAF5",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18, // more space between icons
  },
  iconButton: { padding: 4 }, // bigger touch targets
  iconEdit: { color: COLORS.accentDark },
  iconSave: { color: COLORS.accent },
  iconDelete: { color: COLORS.danger },
  empty: {
    marginTop: 12,
    textAlign: "center",
    color: COLORS.placeholder,
    fontSize: 16,
  },
});
