import React from 'react'
import { Pagination as PaginationSu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export default function Pagination(props) {

    const { totalGames, page, limitPerPage } = props;
    const router = useRouter();

    // Calculamos el total de paginas
    const totalPages= Math.ceil(totalGames / limitPerPage);

    //Obtenemos la url de la pagina y la pasamos a string
    const urlParse = queryString.parseUrl(router.asPath);
    // Creamos una funcion para ir a la nueva pagina
    const goToPage = newPage => {

        // guardamos la pagina en la que nos encontramos
        urlParse.query.page = newPage;
        // pasamos la url de string a objeto query
        const url = queryString.stringifyUrl(urlParse);
        // le indicamos a que direccion queremos ir
        router.push(url);

    }

    return (
        <div className="pagination">
            
            <PaginationSu
            defaultActivePage={page}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            onPageChange={(_, data) => goToPage(data.activePage)}
            boundaryRange={0}
            siblingRange={1}
            ellipsisItem={null}
            />
            
        </div>
    )
}
