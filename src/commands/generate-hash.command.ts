// src/commands/generate-hash.command.ts
import { Command, CommandRunner, Option } from 'nest-commander';
import * as bcrypt from 'bcrypt';

@Command({ name: 'generate-hash', description: '비밀번호 해시 생성' })
export class GenerateHashCommand extends CommandRunner {
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    const password = options?.password || 'test1234';
    const saltRounds = options?.rounds || 12;

    console.log(`평문 비밀번호: ${password}`);
    console.log(`Salt Rounds: ${saltRounds}`);

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`해시된 비밀번호: ${hash}`);

    // 검증
    const isValid = await bcrypt.compare(password, hash);
    console.log(`검증 결과: ${isValid ? '✅ 성공' : '❌ 실패'}`);
  }

  @Option({
    flags: '-p, --password [string]',
    description: '해시할 비밀번호',
  })
  parsePassword(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --rounds [number]',
    description: 'Salt rounds (기본값: 12)',
  })
  parseRounds(val: string): number {
    return parseInt(val, 10);
  }
}
