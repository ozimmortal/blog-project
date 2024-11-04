import { url } from "inspector";


export const GET = async (req: Request) => {
    
    
    return new Response(JSON.stringify({ url:"https://github.com/shadcn.png" }));
}