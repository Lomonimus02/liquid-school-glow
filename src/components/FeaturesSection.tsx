import { 
  Calendar, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Clock,
  Brain,
  Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "ИИ-помощник",
      description: "Интеллектуальная система анализа успеваемости и рекомендаций для каждого ученика",
      color: "text-stellar-primary"
    },
    {
      icon: Calendar,
      title: "Автоматическое расписание",
      description: "Революционная функция автоматического составления расписания с учетом всех ограничений",
      color: "text-stellar-accent",
      highlight: true
    },
    {
      icon: BarChart3,
      title: "Продвинутая аналитика",
      description: "Детальная статистика и отчеты в реальном времени для принятия обоснованных решений",
      color: "text-stellar-glow"
    },
    {
      icon: Users,
      title: "Многоуровневый доступ",
      description: "Гибкая система ролей для учителей, учеников, родителей и администрации",
      color: "text-stellar-primary-light"
    },
    {
      icon: Smartphone,
      title: "Мобильное приложение",
      description: "Полнофункциональное мобильное приложение для всех участников образовательного процесса",
      color: "text-stellar-accent"
    },
    {
      icon: Shield,
      title: "Безопасность данных",
      description: "Современные методы шифрования и защиты персональных данных учащихся",
      color: "text-stellar-glow"
    },
    {
      icon: Clock,
      title: "Уведомления в реальном времени",
      description: "Мгновенные уведомления о важных событиях, оценках и изменениях в расписании",
      color: "text-stellar-primary"
    },
    {
      icon: Sparkles,
      title: "Интуитивный интерфейс",
      description: "Современный дизайн, созданный с учетом потребностей всех пользователей",
      color: "text-stellar-accent"
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-stellar-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stellar-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-stellar-accent" />
            <span className="text-sm font-medium text-text-secondary">Возможности системы</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Почему выбирают</span>
            <br />
            <span className="text-text-primary">Stellar School?</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Наша платформа объединяет все необходимые инструменты для эффективного управления 
            образовательным процессом в едином, интуитивно понятном интерфейсе
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 group hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  feature.highlight ? 'ring-2 ring-stellar-accent/30 glow-effect' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Highlight shimmer effect */}
                {feature.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-accent/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-glass-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.highlight ? 'animate-pulse-glow' : ''}`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-stellar-accent transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-gradient mb-4">-70%</div>
              <div className="text-xl font-semibold text-text-primary mb-2">Времени на администрирование</div>
              <div className="text-text-secondary">Автоматизация рутинных задач освобождает время для обучения</div>
            </div>
            
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-gradient mb-4">+40%</div>
              <div className="text-xl font-semibold text-text-primary mb-2">Вовлеченность учеников</div>
              <div className="text-text-secondary">Интерактивные инструменты повышают интерес к обучению</div>
            </div>
            
            <div className="glass-card p-8 text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold text-gradient mb-4">100%</div>
              <div className="text-xl font-semibold text-text-primary mb-2">Прозрачность процесса</div>
              <div className="text-text-secondary">Полная видимость успеваемости для всех участников</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;