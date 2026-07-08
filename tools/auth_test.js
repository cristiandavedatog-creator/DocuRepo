(async ()=>{
  try {
    const base = 'http://localhost:3000'
    const csrfRes = await fetch(base + '/api/auth/csrf')
    const csrfJson = await csrfRes.json()
    const setCookie = csrfRes.headers.get('set-cookie') || ''
    console.log('CSRF token:', csrfJson.csrfToken)
    console.log('set-cookie header:', setCookie)
    const cookieHeader = setCookie.split(/,?\s*/).map(s=>s.split(';')[0]).join('; ')

    const params = new URLSearchParams()
    params.append('csrfToken', csrfJson.csrfToken)
    params.append('username', 'admin')
    params.append('password', 'Admin123!')
    params.append('json', 'true')

    const loginRes = await fetch(base + '/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookieHeader
      },
      body: params.toString(),
      redirect: 'manual'
    })

    console.log('Login status:', loginRes.status)
    console.log('Location header:', loginRes.headers.get('location'))
    const body = await loginRes.text()
    console.log('Body:')
    console.log(body)
  } catch (e) {
    console.error('Error:', e)
    process.exit(1)
  }
})()
