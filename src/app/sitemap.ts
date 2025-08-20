import { getBlogPosts, getProjects, getSiteSettings } from '@/lib/actions'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();
  const siteUrl = settings.seo.siteURL;

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap(project => ([
    {
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified: new Date(),
    },
    {
        url: `${siteUrl}/en/projects/${project.slug}`,
        lastModified: new Date(),
    }
  ]));

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter(post => post.status === 'published')
    .flatMap(post => ([
        {
            url: `${siteUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
        },
        {
            url: `${siteUrl}/en/blog/${post.slug}`,
            lastModified: new Date(post.date),
        }
    ]));

  const staticRoutes = [
    '', 
    '/projects', 
    '/blog', 
    '/en', 
    '/en/projects', 
    '/en/blog'
  ];

  return [
    ...staticRoutes.map(route => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...projectEntries,
    ...blogEntries,
  ]
}