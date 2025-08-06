import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Database, Rocket, Users, Award } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "5+", icon: Award },
    { label: "Projects Completed", value: "50+", icon: Rocket },
    { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Technologies", value: "20+", icon: Code },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis"] },
    { category: "ML/AI", items: ["Python", "TensorFlow", "scikit-learn", "Pandas", "OpenAI"] },
    { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform"] },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer who bridges the gap between beautiful interfaces 
            and intelligent backends, creating experiences that don't just work—they think.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">My Journey</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Started as a curious kid who wondered how websites worked. Fast-forward through 
                computer science, countless late-night coding sessions, and an obsession with 
                making the web more intelligent.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, I blend traditional web development with machine learning to create 
                applications that adapt, learn, and provide personalized experiences. From 
                recommendation engines to intelligent chatbots, I love building things that 
                make users go "wow, how did it know that?"
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="bg-gradient-card border-border/50 hover-lift">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skillGroup, index) => (
            <Card key={skillGroup.category} className="bg-gradient-card border-border/50 hover-lift">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-center">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-muted/20 text-foreground border-border/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-card border-border/50 p-8 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
                "The best technology is invisible—it just works, understands you, 
                and makes your life better without you having to think about it."
              </blockquote>
              <div className="text-sm text-primary mt-4">— My Development Philosophy</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;