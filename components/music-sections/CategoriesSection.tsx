import { Category } from "@/types/categoryType";
import { Card } from "../ui/card";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-black text-white">
            دسته‌بندی‌ها
          </h2>
          <h3 className="text-gray-400 text-sm sm:text-base">
            کاوش در ژانرهای مختلف موسیقی
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl p-6 sm:p-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 sm:p-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg sm:text-2xl font-bold text-white">
                      {category.tracks}
                    </h4>
                    <h5 className="text-xs sm:text-sm text-gray-400">آهنگ</h5>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <h6 className="text-gray-400 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
                    {category.description}
                  </h6>
                </div>

                {/* Progress indicator */}
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200`}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
