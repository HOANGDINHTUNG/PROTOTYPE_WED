import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const NotFoundPage = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="space-y-5">
      <EmptyState title="Không tìm thấy trang" description="Route này chưa tồn tại trong cấu trúc client hiện tại." />
      <div className="text-center">
        <Link to="/">
          <Button>Quay lại Dashboard</Button>
        </Link>
      </div>
    </div>
  </div>
);
