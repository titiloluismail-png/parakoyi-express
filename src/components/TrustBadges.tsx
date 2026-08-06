import React from 'react';
import { Truck, ShieldCheck, Tag, Clock, Zap, Award } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      title: 'Same-Day Delivery',
      subtitle: 'Fast dispatch across all Ilorin zones within 2 hours',
    },
    {
      icon: Tag,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      title: 'Distributor Wholesale Rates',
      subtitle: 'Direct mill & manufacturer prices for maximum margin',
    },
    {
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: 'Electric Tricycle Logistics',
      subtitle: 'Eco-friendly Keke EV fleet keeping delivery costs low',
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      title: '100% Authentic FMCG',
      subtitle: 'Guaranteed genuine soft drinks, water & food staples',
    },
  ];

  return (
    <section className="bg-white py-8 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${item.borderColor} ${item.bgColor} flex items-start gap-3.5 transition-all hover:shadow-md`}
              >
                <div className={`p-2.5 rounded-xl bg-white shadow-xs ${item.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
