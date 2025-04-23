
export type Project = {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Building a Serverless Data Pipeline",
    description: "Step-by-step guide to creating a complete serverless ETL pipeline using AWS services.",
    date: "April 15, 2025",
    url: "https://determined.substack.com/",
    tags: ["AWS", "Serverless", "ETL", "Pipeline"]
  },
  {
    id: "project-2",
    title: "Real-time Analytics Dashboard",
    description: "Develop a real-time analytics dashboard using Kafka, Spark Streaming, and React.",
    date: "April 8, 2025",
    url: "https://determined.substack.com/",
    tags: ["Kafka", "Spark", "React", "Real-time"]
  },
  {
    id: "project-3",
    title: "Data Quality Monitoring Framework",
    description: "Implementing a comprehensive data quality monitoring framework for your data warehouse.",
    date: "April 1, 2025",
    url: "https://determined.substack.com/",
    tags: ["Data Quality", "Monitoring", "Framework"]
  },
  {
    id: "project-4",
    title: "Building a Data Mesh Architecture",
    description: "Guide to implementing a data mesh architecture in a large organization.",
    date: "March 25, 2025",
    url: "https://determined.substack.com/",
    tags: ["Data Mesh", "Architecture", "Enterprise"]
  },
  {
    id: "project-5",
    title: "Machine Learning Feature Store",
    description: "Creating a feature store for machine learning models using modern data engineering techniques.",
    date: "March 18, 2025",
    url: "https://determined.substack.com/",
    tags: ["ML", "Feature Store", "Data Engineering"]
  },
  {
    id: "project-6",
    title: "dbt Transformation Patterns",
    description: "Advanced dbt transformation patterns and best practices for analytics engineering.",
    date: "March 11, 2025",
    url: "https://determined.substack.com/",
    tags: ["dbt", "Transformations", "Analytics Engineering"]
  }
];
