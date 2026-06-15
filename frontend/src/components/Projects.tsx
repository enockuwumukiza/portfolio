import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, Brain, Zap, Globe } from "lucide-react";
import wardrobeImage from "../../public/images/wardrobe.jpeg"
import chatImage from "../../public/images/chat.png"
import resumeImage from "../../public/images/resume.jpeg"
import { Link } from "react-router-dom"

const Projects = () => {

  const projects = [
    {
      title: "AI-Powered Digital Wardrobe",
      description: "AI-Powered Digital wardrobe management system with outfit matching and smart recommendations.",
      image: wardrobeImage,
      tech: ["React", "TypeScript", "Python", "TensorFlow","Sklearn", "MySQL"],
      category: "Machine Learning",
      icon: Brain,
      features: ["Outfit type detection", "Background removal", "Real-time Processing"],
      demo: "#",
      github: "https://github.com/Enochrwa/myward",
      color: "primary"
    },
    {
      title: "Resume Builder",
      description: "Simplified resume builder with built-in templates and exports",
      image: resumeImage,
      tech: ["Next.js", "Node.js", "Redis",, "ReactJS"],
      category: "Full-Stack",
      icon: Zap,
      features: ["Built-in templates", "Dynamic Pricing", "smart exports"],
      demo: "https://resumeforge-five.vercel.app",
      github: "https://github.com/Enochrwa/resumee-craft-studio",
      color: "secondary"
    },
    {
      title: "Real-Time Chat application",
      description: "Modern team collaboration platform with live editing, smart notifications, and AI-powered meeting insights.",
      image: chatImage,
      tech: ["React", "Socket.io", "MongoDB", "Express", "Docker"],
      category: "Real-Time Apps",
      icon: Globe,
      features: ["Live video and audio calls", "Smart Notifications", "video and audio recording"],
      demo: "#",
      github: "https://github.com/enockuwumukiza/e-chat",
      color: "accent"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions that blend cutting-edge technology 
            with real-world impact. Each project tells a story of problem-solving and innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="bg-gradient-card border-border/50 hover-lift group h-full">
                <CardHeader className="space-y-4">
                  {/* Project Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${project.color}/20 border border-${project.color}/30`}>
                        <project.icon className={`h-5 w-5 text-${project.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="aspect-video rounded-lg bg-muted/20 border border-border/50 overflow-hidden">
                    <img src={project?.image}/>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-foreground">Key Features</h4>
                    <div className="space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${project.color}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs bg-muted/20 text-foreground border-border/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      size="sm" 
                      className={`bg-${project.color} hover:bg-${project.color}/90 flex-1`}
                    >
                      <Play className="mr-2 h-4 w-4" />
                     <Link to={project?.demo}>
                         Live Demo
                     </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-border/50 hover:bg-muted/20"
                    >
                      
                      <Link to={project?.github}>
                        <Github className="h-4 w-4" />
                     </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-border/50 hover:bg-muted/20"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 hover-lift"
          >
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;