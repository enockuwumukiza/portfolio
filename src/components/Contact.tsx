import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Send,
  Coffee,
  Briefcase,
  MessageSquare,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "collaboration" // collaboration, hiring, general
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@portfolio.dev",
      href: "mailto:hello@portfolio.dev",
      description: "Best for detailed discussions"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/yourprofile",
      href: "https://linkedin.com/in/yourprofile",
      description: "Professional networking"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@yourusername",
      href: "https://github.com/yourusername",
      description: "Code collaboration"
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@yourhandle",
      href: "https://twitter.com/yourhandle", 
      description: "Quick updates & thoughts"
    }
  ];

  const inquiryTypes = [
    {
      type: "collaboration",
      icon: Coffee,
      title: "Project Collaboration",
      description: "Let's build something amazing together"
    },
    {
      type: "hiring",
      icon: Briefcase,
      title: "Job Opportunities",
      description: "Discussing full-time or contract roles"
    },
    {
      type: "general",
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Questions, feedback, or just saying hi"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "collaboration"
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getSmartSuggestions = () => {
    const suggestions = {
      collaboration: {
        subject: "Project Collaboration Opportunity",
        message: "Hi! I have an exciting project idea that would benefit from your expertise in..."
      },
      hiring: {
        subject: "Job Opportunity Discussion",
        message: "Hello! We're looking for a talented developer for a role at our company..."
      },
      general: {
        subject: "General Inquiry",
        message: "Hi! I came across your portfolio and wanted to reach out about..."
      }
    };
    return suggestions[formData.type as keyof typeof suggestions];
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you have a project in mind, want to discuss opportunities, 
            or just want to chat about tech, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Inquiry Type Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">What's this about?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {inquiryTypes.map((type) => (
                      <div 
                        key={type.type}
                        onClick={() => handleInputChange('type', type.type)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover-lift ${
                          formData.type === type.type 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border/50 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <type.icon className={`h-5 w-5 ${
                            formData.type === type.type ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <h4 className="font-medium text-sm">{type.title}</h4>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-background/50 border-border/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder={getSmartSuggestions().subject}
                      required
                      className="bg-background/50 border-border/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={getSmartSuggestions().message}
                      rows={6}
                      required
                      className="bg-background/50 border-border/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-hero hover:opacity-90 shadow-glow"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/10 transition-colors hover-lift group"
                  >
                    <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{method.label}</div>
                      <div className="text-sm text-primary">{method.value}</div>
                      <div className="text-xs text-muted-foreground">{method.description}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Status</span>
                    <Badge className="bg-accent text-accent-foreground">
                      Open to Opportunities
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm text-muted-foreground">Within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Timezone</span>
                    <span className="text-sm text-muted-foreground">PST (UTC-8)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-muted/10"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-muted/10"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View My Code
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-muted/10"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;