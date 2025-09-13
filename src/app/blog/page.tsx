import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogPosts } from "@/lib/blog-data";
import { PostCard } from "@/components/blog/post-card";
import type { BlogCategory } from "@/lib/types";

const categories: BlogCategory[] = ["Introvert Chronicles", "Tech Insights", "Web3 Wizardry", "AI & Innovation"];

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Wizard's Library
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Scrolls of knowledge and tales from my journey through the digital realms of code, AI, and Web3.
        </p>
      </div>
      
      <Tabs defaultValue={categories[0]} className="w-full">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-card/50">
                {categories.map(category => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
            </TabsList>
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {blogPosts
                .filter(post => post.category === category)
                .map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
