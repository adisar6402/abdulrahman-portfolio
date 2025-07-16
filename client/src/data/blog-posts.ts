export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-web-apps-python",
    title: "Building AI-Powered Web Applications with Python",
    excerpt: "Exploring how to integrate machine learning models into web applications using Flask, FastAPI, and modern deployment strategies.",
    content: `
# Building AI-Powered Web Applications with Python

Machine learning and web development are converging to create powerful, intelligent applications that can process data and provide insights in real-time. In this post, I'll share my experience integrating AI models into web applications using Python.

## The Tech Stack

For AI-powered web applications, I typically use:
- **FastAPI** or **Flask** for the backend API
- **TensorFlow** or **PyTorch** for machine learning models
- **Redis** for caching model predictions
- **Docker** for containerization

## Key Considerations

1. **Model Performance**: Optimize inference time
2. **Scalability**: Handle multiple concurrent requests
3. **Data Pipeline**: Efficient data preprocessing
4. **Error Handling**: Graceful failure modes

The future of web development is intelligent, and Python provides the perfect ecosystem to build these applications.
    `,
    date: "Jan 24, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Python", "AI", "Web Development", "FastAPI"],
    featured: true,
  },
  {
    id: "flutter-vs-react-native",
    title: "Flutter vs React Native: A 2025 Comparison",
    excerpt: "An in-depth analysis of both frameworks, performance benchmarks, and when to choose each for your next mobile project.",
    content: `
# Flutter vs React Native: A 2025 Comparison

The mobile development landscape continues to evolve, with Flutter and React Native leading the cross-platform space. Having worked with both frameworks, I'll share my insights on their strengths and use cases.

## Performance

**Flutter**: Compiles to native ARM code, offering near-native performance.
**React Native**: Uses a JavaScript bridge, which can introduce overhead.

## Development Experience

**Flutter**: Excellent hot reload, comprehensive widget library.
**React Native**: Familiar React patterns, large ecosystem.

## When to Choose Flutter

- Performance-critical applications
- Custom UI requirements
- Single codebase for multiple platforms

## When to Choose React Native

- Existing React/JavaScript team
- Need for native module integration
- Rapid prototyping

Both frameworks have their place in modern mobile development.
    `,
    date: "Jan 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Flutter", "React Native", "Mobile Development", "Comparison"],
    featured: true,
  },
  {
    id: "tech-environmental-sustainability",
    title: "Technology for Environmental Sustainability",
    excerpt: "How developers can contribute to environmental sustainability through efficient code, green hosting, and conscious technology choices.",
    content: `
# Technology for Environmental Sustainability

As developers, we have a responsibility to consider the environmental impact of our code and technology choices. Here's how we can build more sustainable applications.

## Green Coding Practices

1. **Optimize Algorithm Efficiency**: Reduce computational complexity
2. **Minimize Data Transfer**: Compress images, use efficient protocols
3. **Choose Green Hosting**: Renewable energy-powered servers
4. **Efficient Database Queries**: Reduce server load

## Sustainable Architecture

- **Serverless Computing**: Pay for what you use
- **Edge Computing**: Reduce data center loads
- **Progressive Web Apps**: Reduce app store dependencies
- **Lazy Loading**: Load resources on demand

## Measuring Impact

Tools like Website Carbon Calculator help measure and optimize your application's carbon footprint.

## The Future

As the tech industry grows, our commitment to sustainability becomes increasingly important. Every line of code can make a difference.
    `,
    date: "Jan 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Sustainability", "Green Tech", "Environment", "Best Practices"],
    featured: false,
  },
];
