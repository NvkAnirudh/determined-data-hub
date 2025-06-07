
import { Level } from "./types";

export const levels: Level[] = [
  {
    id: 1,
    title: "The Room of Selection",
    description: "You enter a mystical chamber filled with floating data scrolls. To escape, you must master the art of SELECT.",
    question: "Which query retrieves the names of all students from the 'students' table?",
    options: [
      "SELECT name FROM students;",
      "GET name FROM students;", 
      "SELECT students.name;",
      "FETCH name WHERE students;"
    ],
    correctAnswer: "SELECT name FROM students;",
    explanation: "The SELECT statement is used to query data from a database. The basic syntax is SELECT column_name FROM table_name;",
    successMessage: "🎉 Excellent! The data scrolls glow and reveal the path forward. You've learned the power of SELECT!",
    failureMessage: "💀 The SQL monster blocks your path! The scrolls remain dark. Study the syntax and try again!",
    hint: "Remember: SELECT specifies what columns you want, FROM specifies which table to get them from.",
    concept: "SELECT Basics",
    reward: "SELECT Scroll",
    roomType: 'selection',
    visualElements: {
      background: "ancient_library",
      characters: ["data_wizard", "scroll_guardian"],
      objects: ["floating_scrolls", "selection_altar"]
    }
  },
  {
    id: 2,
    title: "The INNER JOIN Bridge",
    description: "A mystical bridge appears, but it's broken! You must join two sides using the power of INNER JOIN to cross the chasm.",
    question: "You must join two rooms: 'orders' and 'customers'. Retrieve customer names and their order IDs.",
    options: [
      "SELECT c.name, o.id FROM orders o INNER JOIN customers c ON o.customer_id = c.id;",
      "SELECT * FROM orders JOIN customers;",
      "SELECT name, id FROM orders AND customers;",
      "SELECT c.name, o.id FROM customers c JOIN orders o;"
    ],
    correctAnswer: "SELECT c.name, o.id FROM orders o INNER JOIN customers c ON o.customer_id = c.id;",
    explanation: "INNER JOIN connects two tables based on a related column. You need to specify the JOIN condition with ON.",
    successMessage: "🌉 The bridge materializes with golden light! You can now cross between the order and customer realms!",
    failureMessage: "⚡ The bridge crumbles! You fall into the Cartesian pit. Remember to specify the JOIN condition!",
    hint: "INNER JOIN requires an ON clause to specify how the tables are related (usually through foreign keys).",
    concept: "INNER JOIN",
    reward: "JOIN Bridge Blueprint",
    roomType: 'join',
    visualElements: {
      background: "chasm_bridge",
      characters: ["bridge_keeper", "join_spirit"],
      objects: ["broken_bridge", "connection_runes"]
    }
  },
  {
    id: 3,
    title: "The GROUP BY Gate",
    description: "Before you stands an ancient gate sealed by magic. Only by grouping the monsters by type and counting them will the gate unlock.",
    question: "The magic key is only revealed if you group the monsters by type and count them.",
    options: [
      "SELECT type, COUNT(*) FROM monsters GROUP BY type;",
      "SELECT COUNT(type) FROM monsters;",
      "GROUP BY monsters SELECT type;",
      "SELECT type FROM monsters;"
    ],
    correctAnswer: "SELECT type, COUNT(*) FROM monsters GROUP BY type;",
    explanation: "GROUP BY groups rows with the same values. When using aggregate functions like COUNT, you need GROUP BY for non-aggregated columns.",
    successMessage: "🗝️ The magical gate glows and swings open! You've mastered the art of grouping data!",
    failureMessage: "🐉 The gate remains sealed and a SQL dragon emerges! GROUP BY requires aggregate functions like COUNT!",
    hint: "When you SELECT a column and use COUNT(*), you need GROUP BY for the non-aggregated column.",
    concept: "GROUP BY & Aggregation",
    reward: "Magic Grouping Key",
    roomType: 'groupby',
    visualElements: {
      background: "magical_gate",
      characters: ["gate_guardian", "counting_spirit"],
      objects: ["sealed_gate", "monster_statues", "grouping_runes"]
    }
  }
];

export const dungeonRooms = [
  { id: "start", x: 100, y: 400, type: "room" as const, isUnlocked: true, isCompleted: false, level: 0 },
  { id: "room1", x: 300, y: 400, type: "room" as const, isUnlocked: false, isCompleted: false, level: 1 },
  { id: "bridge1", x: 500, y: 400, type: "bridge" as const, isUnlocked: false, isCompleted: false },
  { id: "room2", x: 700, y: 400, type: "room" as const, isUnlocked: false, isCompleted: false, level: 2 },
  { id: "gate1", x: 900, y: 400, type: "door" as const, isUnlocked: false, isCompleted: false },
  { id: "treasure", x: 1100, y: 400, type: "treasure" as const, isUnlocked: false, isCompleted: false }
];
