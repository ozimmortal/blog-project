import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, ChartColumnDecreasing, Pencil } from "lucide-react";
import { DeleteAlertDialog } from "./delete-dialog";

export default function BlogCard() {
    return (
        <div className="">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle className="mb-2">
                        <Link href="/" className="text-xl underline">
                            Lorem ipsum dolor
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, velit
                        numquam. Dicta laboriosam facilis, placeat dolore voluptatem quaerat
                        molestiae veniam! Perferendis doloremque vel reiciendis libero ab alias
                        dolorem ea tenetur.
                    </CardDescription>
                </CardHeader>
                <CardContent className=" flex justify-between">
                    <div className="flex items-center space-x-2">
                        <Switch id="published" defaultChecked={false} />
                        <Label htmlFor="published">{false ? "Published" : "Draft"}</Label>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className=" text-sm font-semibold">
                                    <ChartColumnDecreasing /> Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" text-sm font-semibold">
                                    <Pencil /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <DeleteAlertDialog delete_link="https://www.google.com" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
