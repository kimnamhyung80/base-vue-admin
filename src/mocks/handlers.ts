import { http, HttpResponse, delay } from 'msw'

// Mock 사용자 데이터
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'admin'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    username: 'user',
    role: 'user',
    permissions: ['read'],
    createdAt: '2024-01-15T00:00:00Z',
  },
]

// Mock 토큰
const generateToken = () => `mock-jwt-token-${Date.now()}`
const generateRefreshToken = () => `mock-refresh-token-${Date.now()}`

export const handlers = [
  // 로그인
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500) // 실제 API처럼 지연

    const body = await request.json() as { email: string; password: string }
    const { email, password } = body

    // 테스트 계정: admin@example.com / password123
    // 또는: user@example.com / password123
    const user = mockUsers.find((u) => u.email === email)

    if (!user || password !== 'password123') {
      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      user,
      accessToken: generateToken(),
      refreshToken: generateRefreshToken(),
      expiresIn: 3600,
    })
  }),

  // 로그아웃
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return HttpResponse.json({ success: true })
  }),

  // 토큰 갱신
  http.post('/api/auth/refresh', async ({ request }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      accessToken: generateToken(),
      refreshToken: generateRefreshToken(),
      expiresIn: 3600,
    })
  }),

  // 현재 사용자 정보
  http.get('/api/auth/me', async ({ request }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    // Mock: 첫 번째 사용자 반환
    return HttpResponse.json(mockUsers[0])
  }),

  // 사용자 목록
  http.get('/api/users', async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10')

    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedUsers = mockUsers.slice(start, end)

    return HttpResponse.json({
      items: paginatedUsers,
      total: mockUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockUsers.length / pageSize),
    })
  }),

  // 사용자 상세
  http.get('/api/users/:id', async ({ params }) => {
    await delay(300)

    const { id } = params
    const user = mockUsers.find((u) => u.id === id)

    if (!user) {
      return HttpResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(user)
  }),

  // 회원가입
  http.post('/api/auth/register', async ({ request }) => {
    await delay(600)

    const body = await request.json() as { email: string; username: string; password: string }
    const { email, username } = body

    // 이메일 중복 체크
    if (mockUsers.some((u) => u.email === email)) {
      return HttpResponse.json(
        { message: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      )
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      username,
      role: 'user',
      permissions: ['read'],
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    return HttpResponse.json({
      user: newUser,
      message: '회원가입이 완료되었습니다.',
    })
  }),

  // 비밀번호 재설정 요청
  http.post('/api/auth/forgot-password', async ({ request }) => {
    await delay(500)

    const body = await request.json() as { email: string }
    const { email } = body

    // 이메일 존재 여부와 관계없이 성공 응답 (보안상)
    return HttpResponse.json({
      message: '비밀번호 재설정 링크가 이메일로 발송되었습니다.',
      email,
    })
  }),
]
