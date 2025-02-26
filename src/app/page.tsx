"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Building, CheckCircle, HeartPulse, LineChart, MessageSquare, ShieldCheck } from "lucide-react";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Unlock AI for Health, Finance & More in Africa
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Empowering African businesses with cutting-edge AI solutions tailored for local needs. 
              Connect, test, and deploy AI services seamlessly.
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.1),transparent)]"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes integrating AI into your business simple and effective
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Connect",
                description: "Connect with AI-powered services via APIs or Agents tailored for African contexts.",
                icon: <Brain className="h-12 w-12 text-primary" />
              },
              {
                title: "Test",
                description: "Test AI models and optimize performance for your specific business needs.",
                icon: <CheckCircle className="h-12 w-12 text-primary" />
              },
              {
                title: "Deploy",
                description: "Deploy AI seamlessly for your business with ongoing support and optimization.",
                icon: <Building className="h-12 w-12 text-primary" />
              }
            ].map((step, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                  <CardHeader className="pb-2 text-center">
                    <div className="mx-auto mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI solutions designed for African businesses and challenges
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "AI for Health",
                description: "Medical diagnosis assistance, drug analysis, and patient engagement systems tailored for African healthcare.",
                icon: <HeartPulse className="h-10 w-10 text-primary" />
              },
              {
                title: "AI for Finance",
                description: "Risk analysis, fraud detection, and AI-driven lending solutions for financial inclusion.",
                icon: <LineChart className="h-10 w-10 text-primary" />
              },
              {
                title: "AI Chat & Automation",
                description: "Intelligent bots, support systems, and workflow automation with multilingual African language support.",
                icon: <MessageSquare className="h-10 w-10 text-primary" />
              },
              {
                title: "AI Testing & Governance",
                description: "Performance tracking, compliance checks, and security measures for responsible AI deployment.",
                icon: <ShieldCheck className="h-10 w-10 text-primary" />
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="mb-2">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages for businesses in Africa
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Secure Integrations",
                description: "Enterprise-grade security for all AI integrations and data handling."
              },
              {
                title: "Scalability",
                description: "Solutions that grow with your business from startup to enterprise."
              },
              {
                title: "Affordability",
                description: "Pricing models designed for the African market and business landscape."
              },
              {
                title: "Africa-focused",
                description: "AI solutions built with African contexts, languages, and challenges in mind."
              }
            ].map((reason, index) => (
              <motion.div key={index} variants={fadeIn} className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Business with AI?
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl max-w-2xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join our early access program and be among the first to leverage our AI solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-white text-primary hover:bg-white/90"
              >
                Request Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AfricAI</h3>
              <p className="text-muted-foreground text-sm">
                Empowering African businesses with cutting-edge AI solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">API Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Tutorials</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AfricAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
