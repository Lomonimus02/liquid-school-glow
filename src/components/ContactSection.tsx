import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для демонстрации системы.",
    });

    // Reset form
    setFormData({ name: "", email: "", school: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-24 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-stellar-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-stellar-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <MessageCircle className="w-4 h-4 text-stellar-accent" />
            <span className="text-sm font-medium text-text-secondary">Связаться с нами</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Готовы начать?</span>
            <br />
            <span className="text-text-primary">Свяжитесь с нами</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Получите персональную демонстрацию Stellar School и узнайте, 
            как наша система может трансформировать вашу образовательную организацию
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-6">
              Запросить демонстрацию
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Имя и фамилия
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass-card border-glass-border bg-glass-secondary text-text-primary placeholder:text-text-muted"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass-card border-glass-border bg-glass-secondary text-text-primary placeholder:text-text-muted"
                    placeholder="example@school.ru"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-text-secondary mb-2">
                  Образовательная организация
                </label>
                <Input
                  id="school"
                  name="school"
                  type="text"
                  required
                  value={formData.school}
                  onChange={handleInputChange}
                  className="glass-card border-glass-border bg-glass-secondary text-text-primary placeholder:text-text-muted"
                  placeholder="Название школы или учреждения"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="glass-card border-glass-border bg-glass-secondary text-text-primary placeholder:text-text-muted resize-none"
                  placeholder="Расскажите о ваших потребностях и вопросах..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full glass-button bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                Отправить заявку
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact information */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="space-y-6">
              <div className="glass-card p-6 group hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stellar-primary/20 flex items-center justify-center group-hover:bg-stellar-primary/30 transition-colors">
                    <Mail className="w-6 h-6 text-stellar-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">Email</h4>
                    <p className="text-text-secondary">info@stellarschool.ru</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 group hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stellar-accent/20 flex items-center justify-center group-hover:bg-stellar-accent/30 transition-colors">
                    <Phone className="w-6 h-6 text-stellar-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">Телефон</h4>
                    <p className="text-text-secondary">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 group hover:scale-105 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stellar-glow/20 flex items-center justify-center group-hover:bg-stellar-glow/30 transition-colors">
                    <MapPin className="w-6 h-6 text-stellar-glow" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">Адрес</h4>
                    <p className="text-text-secondary">Москва, ул. Образования, 1</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="glass-card p-6 bg-stellar-primary/5 border-stellar-accent/30">
              <h4 className="text-xl font-semibold text-stellar-accent mb-4">
                Бесплатная консультация
              </h4>
              <p className="text-text-secondary mb-4">
                Мы предлагаем бесплатную 30-минутную консультацию для обсуждения 
                потребностей вашей образовательной организации
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Анализ текущих процессов
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Демонстрация функционала
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  Расчет экономической эффективности
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-stellar-accent rounded-full" />
                  План внедрения
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;