import { ProjectCard } from "@/components/portfolio/project-card";
import { getProjects } from "@/lib/portfolio-data";

export default async function PortfolioPage() {
  const projects = await getProjects();
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Wizard's Grimoire
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of spells and enchantments I've cast. Explore a selection of my work in web development, AI, and Web3.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
