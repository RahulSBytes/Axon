const conversation  = {
  conversation_id: "conv_abc123",
  user_id: "user_xyz789",
  title: "React & Python Help",
  created_at: "2024-05-20T10:15:00Z",
  updated_at: "2024-05-20T10:30:45Z",
  messages: [
    // Message 1: User asks about React
    {
      message_id: "msg_001",
      role: "user",
      content: "How do I use useState in React?",
      tokens: 8,
      created_at: "2024-05-20T10:15:05Z",
    },
    // Message 2: Assistant responds
    {
      message_id: "msg_002",
      role: "assistant",
      content: `The \`useState\` hook is used to add state to functional components in React.

## Basic Syntax

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Key Points

1. **Initial Value**: \`useState(0)\` sets initial state to \`0\`
2. **Returns Array**: \`[value, setValue]\`
3. **Updating State**: Always use the setter function

Would you like more examples?`,
      model: "claude-3-sonnet-20240229",
      tokens: 185,
      created_at: "2024-05-20T10:15:30Z",
      parent_message_id: "msg_001",  // ← Links to user's question
      is_favorite: false,             // ← Favorite status
      metadata: {
        feedback: null,
        latency_ms: 1450,
      },
    },
    // Message 3: User asks about useEffect
    {
      message_id: "msg_003",
      role: "user",
      content: "How to fetch data with useEffect?",
      tokens: 7,
      created_at: "2024-05-20T10:16:00Z",
    },
    // Message 4: Assistant responds
    {
      message_id: "msg_004",
      role: "assistant",
      content: `Here's how to fetch data using \`useEffect\`:

## Basic Data Fetching

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

Need help with anything else?`,
      model: "claude-3-sonnet-20240229",
      tokens: 295,
      created_at: "2024-05-20T10:16:45Z",
      parent_message_id: "msg_003",  // ← Links to user's question
      is_favorite: true,              // ← Marked as favorite
      metadata: {
        feedback: "thumbs_up",
        latency_ms: 1820,
      },
    },
    // Message 5: User asks Python question
    {
      message_id: "msg_005",
      role: "user",
      content: "Write a Python function to check if a number is prime",
      tokens: 11,
      created_at: "2024-05-20T10:17:30Z",
    },
    // Message 6: Assistant responds
    {
      message_id: "msg_006",
      role: "assistant",
      content: `Here's a Python function to check if a number is prime:

## Basic Version

\`\`\`python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

# Usage
print(is_prime(7))   # True
print(is_prime(10))  # False
\`\`\`

## Optimized Version

\`\`\`python
import math

def is_prime(n):
    """Check if n is a prime number."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True
\`\`\`

## Time Complexity

| Version | Complexity |
|---------|------------|
| Basic | O(n) |
| Optimized | O(√n) |

The optimized version is much faster for large numbers!`,
      model: "claude-3-sonnet-20240229",
      tokens: 268,
      created_at: "2024-05-20T10:18:00Z",
      parent_message_id: "msg_005",  // ← Links to user's question
      is_favorite: true,              // ← Marked as favorite
      metadata: {
        feedback: "thumbs_up",
        latency_ms: 1650,
      },
    },
    // Message 7: User asks SQL question
    {
      message_id: "msg_007",
      role: "user",
      content: "How to join two tables in SQL?",
      tokens: 8,
      created_at: "2024-05-20T10:19:00Z",
    },
    // Message 8: Assistant responds
    {
      message_id: "msg_008",
      role: "assistant",
      content: `Here's how to join tables in SQL:

## INNER JOIN

\`\`\`sql
SELECT 
    users.name,
    users.email,
    orders.product,
    orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

## LEFT JOIN

\`\`\`sql
SELECT 
    users.name,
    orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

## JOIN Types

| Type | Description |
|------|-------------|
| \`INNER JOIN\` | Only matching rows |
| \`LEFT JOIN\` | All from left + matching right |
| \`RIGHT JOIN\` | All from right + matching left |
| \`FULL JOIN\` | All rows from both tables |

Need more examples?`,
      model: "claude-3-sonnet-20240229",
      tokens: 320,
      created_at: "2024-05-20T10:19:45Z",
      parent_message_id: "msg_007",  // ← Links to user's question
      is_favorite: false,             // ← Not favorite
      metadata: {
        feedback: null,
        latency_ms: 1920,
      },
    },
  ],
};




const history = [
  {
    title: "Learning JavaScript Basics for Beginners",
    created_at: "2025-01-01",
  },
  {
    title: "Understanding MERN Stack Project Structure",
    created_at: "2025-01-02",
  },
  { title: "How React Components Work Internally", created_at: "2025-01-03" },
  { title: "Building REST APIs Using Express", created_at: "2025-01-04" },
  { title: "MongoDB Schema Design Best Practices", created_at: "2025-01-05" },
  {
    title: "Implementing Authentication Using Passport JS",
    created_at: "2025-01-06",
  },
  { title: "Tailwind CSS Utility Classes Explained", created_at: "2025-01-07" },
  { title: "Deploying MERN Applications on Cloud", created_at: "2025-01-08" },
  { title: "Handling Forms and Validation in React", created_at: "2025-01-09" },
  {
    title: "Optimizing Performance in Node Applications",
    created_at: "2025-01-10",
  },
  {
    title: "Implementing Authentication Using Passport JS",
    created_at: "2025-01-06",
  },
  { title: "Tailwind CSS Utility Classes Explained", created_at: "2025-01-07" },
  { title: "Deploying MERN Applications on Cloud", created_at: "2025-01-08" },
  { title: "Handling Forms and Validation in React", created_at: "2025-01-09" },
  {
    title: "Optimizing Performance in Node Applications",
    created_at: "2025-01-10",
  },
];

const Favorite = [
  {
    message_id: "msg_001",
    role: "user",
    content: "What are the best ramen spots in Tokyo?",
    tokens: 10,
    created_at: "2024-05-20T10:15:05Z",
  },
  {
    message_id: "msg_002",
    role: "assistant",
    parent_message_id: "msg_001",
    is_favorite: true,
    content:
      "For **ramen**, try Ichiran, Afuri, and Nakiryu. For **sushi**, Sushi Dai and Sukiyabashi Jiro are must-visits.",
    tokens: 25,
    created_at: "2024-05-20T10:16:30Z",
  },
  {
    message_id: "msg_003",
    role: "user",
    content: "How can I travel efficiently around Tokyo?",
    tokens: 12,
    created_at: "2024-05-20T10:17:45Z",
  },
  {
    message_id: "msg_004",
    role: "assistant",
    parent_message_id: "msg_003",
    is_favorite: false,
    content:
      "The subway and JR trains are the fastest. Consider getting a **Suica** or **Pasmo** card for convenience.",
    tokens: 20,
    created_at: "2024-05-20T10:18:45Z",
  },
  {
    message_id: "msg_005",
    role: "user",
    content: "Any suggestions for day trips from Tokyo?",
    tokens: 11,
    created_at: "2024-05-20T10:19:50Z",
  },
  {
    message_id: "msg_006",
    role: "assistant",
    parent_message_id: "msg_005",
    is_favorite: true,
    content:
      "Yes! **Nikko**, **Hakone**, and **Kamakura** are popular day-trip destinations accessible by train.",
    tokens: 18,
    created_at: "2024-05-20T10:21:05Z",
  },
  {
    message_id: "msg_007",
    role: "user",
    content: "What's the typical cost for meals in Tokyo?",
    tokens: 12,
    created_at: "2024-05-20T10:22:10Z",
  },
  {
    message_id: "msg_008",
    role: "assistant",
    parent_message_id: "msg_007",
    is_favorite: false,
    content:
      "Casual meals: 800–1500 JPY. Restaurants: 3000 JPY or more. Convenience store meals are cheaper options.",
    tokens: 22,
    created_at: "2024-05-20T10:23:20Z",
  },
  {
    message_id: "msg_009",
    role: "user",
    content: "Can you recommend some traditional Japanese desserts?",
    tokens: 13,
    created_at: "2024-05-20T10:24:30Z",
  },
  {
    message_id: "msg_010",
    role: "assistant",
    parent_message_id: "msg_009",
    is_favorite: true,
    content:
      "Try **mochi**, **dorayaki**, and **taiyaki**. Matcha-flavored sweets like **matcha ice cream** are also popular.",
    tokens: 20,
    created_at: "2024-05-20T10:25:45Z",
  },
];



export { conversation, history, Favorite };
