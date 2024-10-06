import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page_container">
        <Link className="home-page_container-link" href="/create-signature">Создать подпись</Link>
        <Link className="home-page_container-link" href="/check-signature">Проверить подпись</Link>
      </div>
    </div>
  );
}
