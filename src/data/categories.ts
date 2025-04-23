
export type Category = {
  id: string;
  title: string;
  description: string;
};

export type Question = {
  id: string;
  categoryId: string;
  title: string;
  date: string;
  url: string;
  tags: string[];
};

export const categories: Category[] = [
  {
    id: "etl-elt",
    title: "ETL/ELT",
    description: "Extract, Transform, Load data pipeline processes"
  },
  {
    id: "data-warehousing",
    title: "Data Warehousing",
    description: "Storing and managing data for analytics"
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    description: "Scalable data processing systems"
  },
  {
    id: "sql",
    title: "SQL",
    description: "Structured Query Language fundamentals and advanced topics"
  },
  {
    id: "data-modeling",
    title: "Data Modeling",
    description: "Techniques for structuring data"
  },
  {
    id: "big-data",
    title: "Big Data",
    description: "Processing and analyzing large datasets"
  }
];

export const questions: Question[] = [
  // ETL/ELT questions
  {
    id: "etl-1",
    categoryId: "etl-elt",
    title: "What's the difference between ETL and ELT?",
    date: "April 10, 2025",
    url: "https://determined.substack.com/",
    tags: ["ETL", "ELT", "Data Pipeline"]
  },
  {
    id: "etl-2",
    categoryId: "etl-elt",
    title: "How to optimize Airflow DAGs for ETL processes",
    date: "April 3, 2025",
    url: "https://determined.substack.com/",
    tags: ["Airflow", "ETL", "Optimization"]
  },
  {
    id: "etl-3",
    categoryId: "etl-elt",
    title: "Best practices for incremental data loading",
    date: "March 27, 2025",
    url: "https://determined.substack.com/",
    tags: ["ETL", "Incremental Loading", "Best Practices"]
  },
  
  // Data Warehousing questions
  {
    id: "dw-1",
    categoryId: "data-warehousing",
    title: "Snowflake vs BigQuery: Which should you choose?",
    date: "April 12, 2025",
    url: "https://determined.substack.com/",
    tags: ["Snowflake", "BigQuery", "Data Warehouse"]
  },
  {
    id: "dw-2",
    categoryId: "data-warehousing",
    title: "How to design efficient partitioning strategies",
    date: "April 5, 2025",
    url: "https://determined.substack.com/",
    tags: ["Partitioning", "Performance", "Data Warehouse"]
  },
  {
    id: "dw-3",
    categoryId: "data-warehousing",
    title: "Cost optimization techniques for cloud data warehouses",
    date: "March 29, 2025",
    url: "https://determined.substack.com/",
    tags: ["Cost Optimization", "Cloud", "Data Warehouse"]
  },
  
  // Distributed Systems questions
  {
    id: "ds-1",
    categoryId: "distributed-systems",
    title: "CAP theorem explained for data engineers",
    date: "April 14, 2025",
    url: "https://determined.substack.com/",
    tags: ["CAP Theorem", "Distributed Systems"]
  },
  {
    id: "ds-2",
    categoryId: "distributed-systems",
    title: "Understanding data consistency models",
    date: "April 7, 2025",
    url: "https://determined.substack.com/",
    tags: ["Consistency", "Distributed Systems"]
  },
  {
    id: "ds-3",
    categoryId: "distributed-systems",
    title: "Designing fault-tolerant data pipelines",
    date: "March 31, 2025",
    url: "https://determined.substack.com/",
    tags: ["Fault Tolerance", "Reliability", "Pipelines"]
  },
  
  // SQL questions
  {
    id: "sql-1",
    categoryId: "sql",
    title: "Advanced window functions in SQL",
    date: "April 15, 2025",
    url: "https://determined.substack.com/",
    tags: ["SQL", "Window Functions", "Advanced"]
  },
  {
    id: "sql-2",
    categoryId: "sql",
    title: "Optimizing SQL query performance",
    date: "April 8, 2025",
    url: "https://determined.substack.com/",
    tags: ["SQL", "Query Optimization", "Performance"]
  },
  {
    id: "sql-3",
    categoryId: "sql",
    title: "Common Table Expressions (CTEs) deep dive",
    date: "April 1, 2025",
    url: "https://determined.substack.com/",
    tags: ["SQL", "CTE", "Advanced SQL"]
  },
  
  // Data Modeling questions
  {
    id: "dm-1",
    categoryId: "data-modeling",
    title: "Star schema vs Snowflake schema",
    date: "April 16, 2025",
    url: "https://determined.substack.com/",
    tags: ["Data Modeling", "Star Schema", "Snowflake Schema"]
  },
  {
    id: "dm-2",
    categoryId: "data-modeling",
    title: "Data vault modeling fundamentals",
    date: "April 9, 2025",
    url: "https://determined.substack.com/",
    tags: ["Data Modeling", "Data Vault"]
  },
  {
    id: "dm-3",
    categoryId: "data-modeling",
    title: "Dimensional modeling best practices",
    date: "April 2, 2025",
    url: "https://determined.substack.com/",
    tags: ["Data Modeling", "Dimensional Modeling"]
  },
  
  // Big Data questions
  {
    id: "bd-1",
    categoryId: "big-data",
    title: "Introduction to Apache Spark architecture",
    date: "April 17, 2025",
    url: "https://determined.substack.com/",
    tags: ["Big Data", "Apache Spark", "Architecture"]
  },
  {
    id: "bd-2",
    categoryId: "big-data",
    title: "Hadoop ecosystem components explained",
    date: "April 10, 2025",
    url: "https://determined.substack.com/",
    tags: ["Big Data", "Hadoop", "Ecosystem"]
  },
  {
    id: "bd-3",
    categoryId: "big-data",
    title: "Streaming data processing with Kafka",
    date: "April 3, 2025",
    url: "https://determined.substack.com/",
    tags: ["Big Data", "Kafka", "Streaming"]
  }
];
