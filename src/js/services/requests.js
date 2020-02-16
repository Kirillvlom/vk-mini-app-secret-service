export async function notesCreateNote(url = '', data) {
  // Значения по умолчанию обозначены знаком *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    });
    return await response.json(); // парсит JSON ответ в Javascript объект
}

export async function aceesToNote(url = '') {
    // Значения по умолчанию обозначены знаком *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer'
    });
    return await response.json(); // парсит JSON ответ в Javascript объект
}

export async function getNotesByUser(url = '') {
  // Значения по умолчанию обозначены знаком *
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer'
    });
    return await response.json(); // парсит JSON ответ в Javascript объект
}

export async function findNote(url = '') {
    // Значения по умолчанию обозначены знаком *
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer'
    });

    return await response.json(); // парсит JSON ответ в Javascript объект
  }

export async function deleteNote(url = '') {
    // Значения по умолчанию обозначены знаком *
      const response = await fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrer: 'no-referrer'
      });
      return await response.json(); // парсит JSON ответ в Javascript объект
  }

