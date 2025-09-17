import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Award } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full-Stack Developer Intern",
      company: "TechCorp Inc.",
      location: "Remote",
      period: "2024 - 2025",
      type: "Part-time",
      description: "Built scalable microservices architecture and implemented ML-driven features.",
      achievements: [
        "Increased platform performance by 40% through optimization",
        "Led team of 5 developers in agile environment",
        "Implemented ML recommendation system improving user engagement by 60%",
        
      ],
      tech: ["React", "Node.js", "Python", "Docker", "PostgreSQL"]
    },
    {
      title: "Frontend Developer Intern",
      company: "DesignStudio LLC",
      location: "Remote",
      period: "2022- 2023",
      type: "Contract",
      description: "Specialized in creating pixel-perfect, responsive web applications for design agencies and creative studios. Focus on performance and user experience.",
      achievements: [
        "Delivered 15+ high-profile client projects",
        "Achieved 100% client satisfaction rate",
        "Implemented advanced animations and interactions",
        "Mentored junior developers in modern frontend practices"
      ],
      tech: ["React", "TypeScript", "Sass", "Three.js", "Gatsby", "Contentful"]
    },
    {
      title: "Software Engineering Intern",
      company: "BigTech Corporation",
      location: "Remote",
      period: "Summer 2023",
      type: "Internship",
      description: "Contributed to large-scale distributed systems serving millions of users. Gained experience in enterprise development practices and system design.",
      achievements: [
        "Implemented feature used by 2M+ active users",
        "Reduced API response time by 30%",
        "Participated in code reviews and design meetings",
        "Presented final project to senior leadership"
      ],
      tech: ["Java", "Spring", "Kafka", "Elasticsearch", "Kubernetes", "Jenkins"]
    }
  ];

  const education = [
    {
      degree: "Bachelor's degree in Computer Science",
      school: "INES Ruhengeri University",
      location: "Rwanda",
      period: "2022 - 2025",
      focus: "Software engeneering",
      achievements: ["GPA: 3.9/4.0", "Research in Machine learning", "Application of ML in health care"]
    },
   
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A journey of continuous growth, learning, and building solutions that matter.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Experience</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border"></div>
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <Card className="bg-gradient-card border-border/50 hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-primary mb-1">{exp.title}</h4>
                          <h5 className="text-lg font-semibold mb-2">{exp.company}</h5>
                        </div>
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {exp.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="mb-4">
                        <h6 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent" />
                          Key Achievements
                        </h6>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="text-xs bg-muted/20 text-foreground border-border/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-card border-border/50 hover-lift h-full">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-primary mb-2">{edu.degree}</h4>
                    <h5 className="text-md font-semibold mb-1">{edu.school}</h5>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </div>

                    <Badge variant="outline" className="mb-4 border-secondary/50 text-secondary">
                      Focus: {edu.focus}
                    </Badge>

                    <div>
                      <h6 className="font-semibold mb-2 text-sm">Highlights</h6>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;