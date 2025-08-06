import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Database, 
  Brain, 
  Cloud, 
  Smartphone, 
  Palette,
  Terminal,
  GitBranch
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code2,
      color: "primary",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Three.js/R3F", level: 60 }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      color: "secondary",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "FastAPI", level: 80 }
      ]
    },
    {
      title: "Machine Learning",
      icon: Brain,
      color: "accent",
      skills: [
        { name: "TensorFlow", level: 85 },
        { name: "scikit-learn", level: 90 },
        { name: "Pandas/NumPy", level: 88 },
        { name: "Computer Vision", level: 45 }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      color: "primary",
      skills: [
        { name: "Docker", level: 85 },

      ]
    }
  ];

  const certifications = [
    { name: "Scientic Computing With Python", year: "2023", issuer: "Freecodecamp" },
    { name: "TensorFlow Developer", year: "2023", issuer: "Google" },
    { name: "Back End Development and APIs", year: "2024", issuer: "Freecodecamp" },
    { name: "JavaScript Algorithms and Data structures", year: "2023", issuer: "Freecodecamp" },
    { name: "Data Analysis with Python", year: "2025", issuer: "Freecodecamp" },
  ];

  const getColorClass = (color: string, type: string) => {
    const colorMap: Record<string, Record<string, string>> = {
      primary: {
        bg: "bg-primary/20",
        border: "border-primary/30",
        text: "text-primary",
        progress: "bg-primary"
      },
      secondary: {
        bg: "bg-secondary/20",
        border: "border-secondary/30", 
        text: "text-secondary",
        progress: "bg-secondary"
      },
      accent: {
        bg: "bg-accent/20",
        border: "border-accent/30",
        text: "text-accent", 
        progress: "bg-accent"
      }
    };
    return colorMap[color]?.[type] || "";
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit built through years of hands-on experience, 
            continuous learning, and real-world problem solving.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-card border-border/50 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${getColorClass(category.color, 'bg')} ${getColorClass(category.color, 'border')} border`}>
                      <category.icon className={`h-6 w-6 ${getColorClass(category.color, 'text')}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.level} 
                            className="h-2 bg-muted/20"
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className={`absolute top-0 left-0 h-2 rounded-full ${getColorClass(category.color, 'progress')}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Certifications & Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-card border-border/50 hover-lift">
                  <CardContent className="p-4 text-center">
                    <Badge variant="outline" className="mb-3 border-primary/50 text-primary">
                      {cert.year}
                    </Badge>
                    <h4 className="font-semibold text-sm mb-2">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-card border-border/50 p-8 max-w-4xl mx-auto">
            <CardContent className="p-0 text-center">
              <div className="flex justify-center mb-4">
                <Terminal className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">My Tech Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in choosing the right tool for the job, not the newest one. 
                Every technology decision should serve the user experience and business goals. 
                Simplicity scales better than complexity.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;