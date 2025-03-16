import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Es rápido, fácil y{" "}</span>
        <span className={title({ color: "green" })}>seguro</span>
        <div className={subtitle({ class: "mt-4" })}>
          Ajustamos nuestros productos según lo que necesites
        </div>
      </div>
      <div className="flex gap-6">
        <Button as={Link} href="/auth/signup" color="primary" variant="bordered" size="lg" radius="full">Registrate</Button>
        <Button as={Link} href="/auth/login" color="primary" size="lg" radius="full">Ingresar</Button>
      </div>
    </section>
  );
}
