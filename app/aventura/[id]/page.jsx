export default async function Page({ params }) {
    console.log(params);

    // const aventura = await getAventura(params.id);
    return <div className="h-[90vh]">Aventura</div>;
    // return <AventuraDetalhes aventura={aventura} />;
}