import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { FaAws } from "react-icons/fa6";

export default async function page({
  params,
}: {
  params: { locale: LocaleTypes };
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { t } = await createTranslation(resolvedParams.locale, "common");
  return (
    <div className='flex flex-col items-center justify-center pt-[100px]'>
      <p className='text-[20px] font-bold pb-[20px]'>{t("title")}</p>
      <p>CLF-C02</p>
      <Link href={`${locale}/quiz`} className='py-[50px] group'>
        <FaAws size='100' style={{ color: "darkorange" }} />
      </Link>
      <small>{t("button")}</small>
    </div>
  );
}
