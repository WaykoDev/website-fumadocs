import { abouts } from "@/lib/source"

export default function AboutPage() {
    const posts = abouts.getPage();
    console.log(posts);
    return <div>About page</div>;
}